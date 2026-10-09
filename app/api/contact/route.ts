import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Body {
  name?: string;
  email?: string;
  budget?: string;
  message?: string;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const budget = body.budget?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "نام، ایمیل و پیام الزامی است." },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "لطفاً یک ایمیل معتبر وارد کنید." },
      { status: 400 }
    );
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: "حجم پیام بیش از حد مجاز است." },
      { status: 413 }
    );
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        error: `فرم تماس در این نسخه متصل نیست. لطفاً مستقیم به ${CONTACT_EMAIL} ایمیل بزنید.`,
      },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: `لطفاً مستقیم به ${CONTACT_EMAIL} ایمیل بزنید.` },
      { status: 503 }
    );
  }

  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || null;
  const userAgent = req.headers.get("user-agent") ?? null;

  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert({
      name,
      email,
      budget: budget || null,
      message,
      user_agent: userAgent,
      ip_address: ip,
    });

  if (dbError) {
    console.error("Supabase insert failed:", {
      message: dbError.message,
      code: dbError.code,
      hint: dbError.hint,
    });

    const tableMissing =
      dbError.code === "42P01" ||
      dbError.code === "PGRST205" ||
      /relation .* does not exist/i.test(dbError.message || "") ||
      /could not find the table/i.test(dbError.message || "");

    return NextResponse.json(
      {
        error: tableMissing
          ? "پایگاه‌داده متصل است اما هنوز راه‌اندازی نشده. فایل supabase/migrations/0001_init.sql را در SQL Editor پایگاه‌داده اجرا کنید."
          : "ذخیره پیام ممکن نشد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
