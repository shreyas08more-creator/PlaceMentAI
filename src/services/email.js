export async function sendReportEmail(userEmail, title, reportContent) {
try {
const response = await fetch("/api/resend/emails", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
from:"PlacementAI <onboarding@resend.dev>",
to: 'shreyas08more@gmail.com',
subject: title,
html: ` <div style="font-family: Arial, sans-serif; padding: 30px; background: #f8fafc;"> <div style="
           max-width: 700px;
           margin: auto;
           background: white;
           border-radius: 16px;
           padding: 40px;
           box-shadow: 0 10px 30px rgba(0,0,0,0.08);
         "> <h1 style="color:#2563eb; margin-bottom:20px;">
🚀 PlacementAI Report </h1>


          <h2 style="margin-bottom:20px;">
            ${title}
          </h2>

          <pre style="
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.8;
            color: #334155;
            font-family: Arial, sans-serif;
          ">


${reportContent} </pre>


          <hr style="margin:30px 0; border:none; border-top:1px solid #e2e8f0;" />

          <p style="color:#64748b;">
            Sent from PlacementAI
          </p>
        </div>
      </div>
    `,
  }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(
    data.message || data.error || "Failed to send email"
  );
}

return data;


} catch (error) {
console.error("Email error:", error);
throw error;
}
}
