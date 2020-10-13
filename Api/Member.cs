using System;
using System.ComponentModel.DataAnnotations;

namespace CduNsa.Api
{
    public class Member
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Course { get; set; }
        [Required]
        public string StudentNumber { get; set; }
        public string PhoneNumber { get; set; }
    }
}