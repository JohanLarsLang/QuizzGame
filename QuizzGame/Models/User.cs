using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzGame.Models
{
    public class User : IdentityUser
    {

       public  HighScore HighScore { get; set; }
        
    }
}
