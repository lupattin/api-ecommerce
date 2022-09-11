import sgMail from "@sendgrid/mail"
/* const sgMail = require('@sendgrid/mail') */
sgMail.setApiKey(process.env.SENDGRID_SECRET)


export async function sendMail(to:string,code:number){
    
    const msg = {
      to, 
      from: "pattindev@gmail.com", 
      subject: `Codigo de ingreso`,
      text: `Hola, tu codigo para ingresar es: ${code} `,
    }
    sgMail
      .send(msg)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error
      })
}