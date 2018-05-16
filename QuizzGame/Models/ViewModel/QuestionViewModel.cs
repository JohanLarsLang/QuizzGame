using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzGame.Models.ViewModel
{
    public class QuestionViewModel
    {
        public string QuizzEng { get; set; }
        public string QuizzSwe { get; set; }
        public bool Correct { get; set; }
        public int Score { get; set; }
    }
}
