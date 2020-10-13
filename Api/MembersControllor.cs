using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CduNsa.Api
{
   // [Route("api/members")]
    public class MembersControllor : ControllerBase
    {
        private readonly CduNsaDataContext db;
        
        public MembersControllor(CduNsaDataContext db)
        {
            this.db = db;
        }

        [Route("api/members"), HttpGet]
        public async Task<IActionResult> Index()
        {
            var members=await db.Members.OrderBy(x=>x.Name).ToListAsync();
            return Ok(members);
        }

        [Route("api/members/{id}"),HttpGet]
        public async Task<IActionResult> Detail(Guid id)
        {
            var member = await db.Members.FirstOrDefaultAsync(x => x.Id == id);
            if (member != null)
            {
                return Ok(member);
            }

            return NotFound();
        }

        [Route("api/members"), HttpPost]
        public async Task<IActionResult> Create([FromBody]Member member)
        {
            if (ModelState.IsValid)
            {
                member.Id=Guid.NewGuid();
                await this.db.Members.AddAsync(member);
                await db.SaveChangesAsync();
                return CreatedAtAction(nameof(Create), member);
            }
            return BadRequest(ModelState);
            
        }

        

        [Route("api/members/{id}"), HttpPut]
        public async Task<IActionResult> Update(string id,[FromBody]Member member)
        {
            if (ModelState.IsValid)
            {
                var oldRecord = await db.Members.FirstOrDefaultAsync(x => x.Id == Guid.Parse(id));
                if (oldRecord == null)
                {
                    return NotFound(member);
                }
                oldRecord.Course = member.Course;
                oldRecord.Email = member.Email;
                oldRecord.Name = member.Name;
                oldRecord.PhoneNumber = member.PhoneNumber;
                oldRecord.StudentNumber = member.StudentNumber;
                db.Members.Update(oldRecord);
                await db.SaveChangesAsync();
                return Ok(member);

            }
            return BadRequest(ModelState);

        }


        [Route("api/members/{id}"),HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            var oldRecord = await db.Members.FirstOrDefaultAsync(x => x.Id == id);
            if (oldRecord == null)
            {
                return NotFound();
            }

            db.Members.Remove(oldRecord);
            await db.SaveChangesAsync();
            return Ok();
        }



        [HttpPost("api/send-email")]
        public IActionResult SendEmail(EmailMessage message)
        {
            try
            {
                using var smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential()
                {
                    UserName = "Your email",
                    Password = "Your password",
                };
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;

                //Oops: from/recipients switched around here...
                //smtpClient.Send("targetemail@targetdomain.xyz", "myemail@gmail.com", "Account verification", body);
                smtpClient.SendAsync("myemail@gmail.com", message.To, message.Subject, message.Body,"token1");
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("{0}: {1}", e.ToString(), e.Message);
            }

            return Ok("");
        }

    }

    public class EmailMessage
    {
        public string To { get; set; }
        public string Body { get; set; }
        public string Subject { get; set; }
    }
}