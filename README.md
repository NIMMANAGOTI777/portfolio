# Contact & Lead Capture System

A professional, high-fidelity Contact & Lead Capture System built with **React**, **Supabase**, **EmailJS**, and **Tailwind CSS**. It features a modern glassmorphic interface, client-side validation, anti-spam rate limiting, automated dual-email notification workflows, and a protected leads dashboard featuring interactive SVG-based analytics.

---

## 🛠️ Step 1: Supabase Database Setup

1. Log in to your [Supabase Dashboard](https://supabase.com/) and create a new project.
2. Go to the **SQL Editor** in the left sidebar and click **New Query**.
3. Paste the contents of `supabase_schema.sql` into the editor and click **Run**:
   - This creates the `contact_leads` table.
   - It enables **Row Level Security (RLS)**.
   - It configures public insert access (allowing website visitors to submit contact forms) but restricts select/delete privileges to authenticated accounts.

---

## 🔐 Step 2: Create Admin User Account

To access the `/admin/leads` dashboard securely, you must provision an admin account inside your Supabase project:
1. In the Supabase dashboard, click on **Authentication** (the user icon).
2. Click **Add User** > **Create User**.
3. Enter an email address and a secure password.
4. Uncheck "Send email confirmation" to instantly activate the user, then click **Create User**.
5. You can now use these credentials to log in at the `/admin/leads` route.

---

## ✉️ Step 3: EmailJS Setup (For Instant Notifications)

[EmailJS](https://www.emailjs.com/) is used to send secure notifications directly from the frontend without spinning up a custom backend.

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. Add an **Email Service** (e.g., connect your Gmail, Outlook, or SMTP server).
3. Create **two email templates**:

### Template A: Admin Lead Notification
* **Subject:** `🚀 New Portfolio Lead Received`
* **Body:**
  ```text
  Name: {{name}}
  Email: {{email}}
  Phone: {{phone}}
  Company: {{company}}
  Purpose: {{purpose}}

  Message:
  {{message}}

  Submitted At:
  {{timestamp}}
  ```

### Template B: Auto-Reply to Visitor
* **Subject:** `Thanks for Connecting with Karthik`
* **To Email Field (IMPORTANT):** Set this field to `{{email}}` in the template configuration so it replies to the visitor.
* **Body:**
  ```text
  Hi {{name}},

  Thank you for reaching out.

  I have received your message and will get back to you soon.

  Looking forward to connecting.

  Regards,
  Karthik Nimmanagoti
  ```

---

## ⚙️ Step 4: Environment Configurations

Copy the `.env.example` file to `.env` and fill in the values:

```bash
# Supabase credentials (Settings > API)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# EmailJS configurations (Email Services & Templates pages)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_notification_template_id
VITE_EMAILJS_TEMPLATE_ID_VISITOR=your_visitor_autoreply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# WhatsApp contact (No +, 00, or spaces - e.g. 15551234567)
VITE_WHATSAPP_NUMBER=1234567890
```

---

## 🚀 Step 5: Run Locally

Install the packages and run the Vite local development server:

```bash
# Install dependencies
npm install

# Start Vite server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.
- Navigate to `/` to view the portfolio playground and test form submission.
- Navigate to `/admin/leads` to view the analytics dashboard and search through submissions.

---

## 📦 Step 6: Production Build & Deployment

To build the static application bundle:

```bash
npm run build
```

This compiles your application into the `dist/` directory. You can host this folder on any static hosting provider:
* **Vercel / Netlify:** Import the repository, select Vite as framework, and configure environment variables in the provider dashboard.
* **GitHub Pages:** Deploy the compiled `dist/` bundle or configure a GitHub Action.
