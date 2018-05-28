using QuizzGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzGame.ViewModel
{
    public class HighScoreViewModel
    {
        public User User { get; set; }
        public DateTime Timestamp { get; set; }
        public int TotalScore { get; set; }
    }
}
