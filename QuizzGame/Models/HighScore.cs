﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzGame.Models
{
    public class HighScoreViewModel
    {
        public int id { get; set; }
        public User User { get; set; }
        public DateTime Timestamp { get; set; }
        public int TotalScore { get; set; }
    }
}
