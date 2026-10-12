import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ContactLead } from "@/models/ContactLead";
import { authenticateAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authenticateAdmin(req);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();
    const leads = await ContactLead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      name,
      email,
      phone,
      message,
      company_name,
      country,
      city,
      product_service,
      contact_person,
      mobile,
      describe_requirement,
    } = body;

    const leadName = name || contact_person;
    const leadEmail = email;
    const leadPhone = phone || mobile || "";
    const leadMessage = message || describe_requirement || "";

    if (!leadName || !leadEmail) {
      console.warn("[LEAD API] Validation Failed: Name and email are required.");
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    // 1. Save Lead in MongoDB Database
    let lead;
    try {
      lead = await ContactLead.create({
        name: leadName,
        email: leadEmail,
        phone: leadPhone,
        message: leadMessage,
        company_name: company_name || "",
        country: country || "",
        city: city || "",
        product_service: product_service || "",
      });
      console.log(`[LEAD API] SUCCESS: DB lead created with ID: ${lead._id} for ${leadEmail}`);
    } catch (dbErr: any) {
      console.error("[LEAD API] FAILURE: Database error saving lead:", dbErr.message);
      return NextResponse.json(
        {
          success: false,
          message: "Database failed to save lead: " + dbErr.message,
          dbStatus: { success: false, error: dbErr.message },
          crmStatus: { fired: false, success: false, message: "Skipped due to DB failure" },
        },
        { status: 500 }
      );
    }

    // 2. Fire Groweon CRM API
    let crmStatus = {
      fired: true,
      success: false,
      statusCode: 0,
      response: "",
      error: "",
    };

    try {
      const crmUrl =
        "https://crm.groweon.com/capture/website/c0c0250d845315c283272ab8451e9a19";

      // Matches the official LMSbaba / Groweon CRM PHP cURL integration 1:1
      const params = new URLSearchParams();
      params.append("email", leadEmail || "");
      params.append("mobile", leadPhone || "");
      params.append("contact_person", leadName || "");
      params.append("company_name", company_name || "");
      params.append("country", country || "");
      params.append("city", city || "");
      params.append("product_service", product_service || "Barrisol Stretch Ceiling");
      params.append("describe_requirement", leadMessage || "");
      params.append("source", "groweon.com");
      params.append("description[]", "");

      console.log(`[GROWEOIN CRM] Firing API to ${crmUrl} for lead: ${leadEmail}`);

      const crmResponse = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const responseText = await crmResponse.text();
      crmStatus.statusCode = crmResponse.status;
      crmStatus.response = responseText;

      let crmJson: any = null;
      try {
        crmJson = JSON.parse(responseText);
      } catch (_) {}

      if (crmResponse.ok && (!crmJson || (crmJson.status !== "FAIL" && crmJson.code !== 404))) {
        crmStatus.success = true;
        console.log(`[GROWEOIN CRM] SUCCESS (HTTP ${crmResponse.status}): Response:`, responseText);
      } else {
        crmStatus.success = false;
        crmStatus.error =
          crmJson?.error_msg ||
          (crmJson?.status === "FAIL" ? "CRM API returned FAIL status" : `HTTP Error ${crmResponse.status}`);
        console.error(`[GROWEOIN CRM] FAILURE (HTTP ${crmResponse.status}):`, crmStatus.error);
      }
    } catch (crmErr: any) {
      crmStatus.success = false;
      crmStatus.error = crmErr.message || "Network Error";
      console.error("[GROWEOIN CRM] FAILURE: Exception thrown while calling CRM API:", crmErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        lead,
        dbStatus: { success: true, id: lead._id },
        crmStatus,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[LEAD API] Unexpected server error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
