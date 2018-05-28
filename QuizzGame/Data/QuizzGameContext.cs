using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizzGame.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace QuizzGame.Data
{
    public class QuizzGameContext : IdentityDbContext<User>
    {
        public QuizzGameContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<HighScore> HighScores { get; set; }
        //public DbSet<QuizzGame.Models.HighScore> HighScore { get; set; }

        public void SeedQuestions()
        {
            //var cateMatte = new Category() { Name = $"Matematics" };
            var question1 = new Question()
            {
                //CategoryId = cateMatte.Id,
                QuizzEng = $"Has a common ladybird seven dots?",
                QuizzSwe = $"Har en vanlig nyckelpiga sju prickar?",
                Correct = true,
                Score = 1
            };
     
           //Categories.Add(cateMatte);
           Questions.Add(question1);

            var question2 = new Question()
            {
                QuizzEng = $"Has the planet Mars three moons?",
                QuizzSwe = $"Har planeten Mars 3 månar?",
                Correct = false,
                Score = 2
            };
            Questions.Add(question2);
            
            var question3 = new Question()
            {
                QuizzEng = $"Is the Lake Baikal the world´s deepest lake?",
                QuizzSwe = $"Heter väldens djupaste sjö, Bajkalsjön?",
                Correct = false,
                Score = 3
            };
            Questions.Add(question3);

            var question4 = new Question()
            {
                QuizzEng = $"Is the mountain K2 the world´s second highest mountain?",
                QuizzSwe = $"Är K2 världen näst högsta berg?",
                Correct = true,
                Score = 1
            };
            Questions.Add(question4);

            var question5 = new Question()
            {
                QuizzEng = $"Is Monaco the world's smallest country?",
                QuizzSwe = $"Är Monnaco världens minsta land?",
                Correct = false,
                Score = 1
            };
            Questions.Add(question5);

            var question6 = new Question()
            {
                QuizzEng = $"Is 3 swedish \"tjog\" 60?",
                QuizzSwe = $"Blir 3 stycken tjog 60?",
                Correct = true,
                Score = 1
            };
            Questions.Add(question6);

            var question7 = new Question()
            {
                QuizzEng = $"Is one foot 13 inches?",
                QuizzSwe = $"Är en foot lika med 13 tum?",
                Correct = false,
                Score = 1
            };
            Questions.Add(question7);

            var question8 = new Question()
            {
                QuizzEng = $"Is the symbol for inches: \"?",
                QuizzSwe = $"Är symbolen för inches: \"?",
                Correct = true,
                Score = 1
            };
            Questions.Add(question8);

            var question9 = new Question()
            {
                QuizzEng = $"Is the Bird-of-paradise the word's samllest bird?",
                QuizzSwe = $"Är paradisfågeln världens minstsa fågel?",
                Correct = false,
                Score = 1
            };
            Questions.Add(question9);

            var question10 = new Question()
            {
                QuizzEng = $"Is Tokyo the wold´s most populated city?",
                QuizzSwe = $"Är den folkrikaste storstaden i välden Tokyo?",
                Correct = true,
                Score = 2
            };
            Questions.Add(question10);

            var question11 = new Question()
            {
                QuizzEng = $"Is the planet Jupiter mass equivalent to 2,5 times the mass of all of the other planets together in our galaxy?",
                QuizzSwe = $"Är planetens Jupiters massa lika med 2,5 gånger så stor som alla andra planeterna tillsammans i vår galax?",
                Correct = true,
                Score = 2
            };
            Questions.Add(question11);

            var question12 = new Question()
            {
                QuizzEng = $"Is white shark the wold's second largest shark after whale shark?",
                QuizzSwe = $"Är vithaj väldens näst största haj efter valhaj?",
                Correct = false,
                Score = 3
            };
            Questions.Add(question12);

            var question13 = new Question()
            {
                QuizzEng = $"Is the volkan Yellowstone Caldera, USA, the world's most dangerous?",
                QuizzSwe = $"Är vulkanen Yellowstone Caldera, USA, väldens farligaste?",
                Correct = false,
                Score = 3
            };
            Questions.Add(question13);

            var question14 = new Question()
            {
                QuizzEng = $"Is Canada the second largest country of the area?",
                QuizzSwe = $"Är Kanada världens andra största land till ytan?",
                Correct = true,
                Score = 3
            };
            Questions.Add(question14);

            var question15 = new Question()
            {
                QuizzEng = $"Has the planet Venus lager orbit around the sun than Mars?",
                QuizzSwe = $"Har planeten Venus längre omloppsbana runt solen än Mars?",
                Correct = false,
                Score = 2
            };
            Questions.Add(question15);

            var question16 = new Question()
            {
                QuizzEng = $"Is Africa´s highest mountain Kilimanjaro placed in Tanzania?",
                QuizzSwe = $"Ligger Afrikas högsta berg Kilimanjaro i Tanzania?",
                Correct = true,
                Score = 2
            };
            Questions.Add(question16);

            var question17 = new Question()
            {
                QuizzEng = $"Leads the material copper best current of all material?",
                QuizzSwe = $"Leder matrialet koppar bäst ström av alla material?",
                Correct = false,
                Score = 2
            };
            Questions.Add(question17);

            var question18 = new Question()
            {
                QuizzEng = $"Does water freze by 32 degree Farenheit?",
                QuizzSwe = $"Fryser vatten vid 32 grader Farenheit?",
                Correct = true,
                Score = 2
            };
            Questions.Add(question18);

            var question19 = new Question()
            {
                QuizzEng = $"Has the flag of Lithuania the same colors as Norway?",
                QuizzSwe = $"Har Litauens flagga samma färger som Norge?",
                Correct = false,
                Score = 3
            };
            Questions.Add(question19);

            var question20 = new Question()
            {
                QuizzEng = $"Is the fly larvae called maggot?",
                QuizzSwe = $"Heter flugans larver maggot?",
                Correct = true,
                Score = 2
            };
            Questions.Add(question20);

            var question21 = new Question()
            {
                QuizzEng = $"Is Canberra city the name of the captital of Australia?",
                QuizzSwe = $"Heter Australiens huvudstad Canberra?",
                Correct = true,
                Score = 2
            };
            Questions.Add(question21);

            /*
            var user1 = new User()
            {
                Email = "test@email.se",
                
            };

            Users.Add(user1);

            var highScore1 = new HighScore()
            {
                User = user1,
                Timestamp = new DateTime(),
                TotalScore = 15
            };
            user1.HighScore = highScore1;

            var user2 = new User()
            {
                Email = "kul@email.se",
                
            };

            Users.Add(user2);

            var highScore2 = new HighScore()
            {
                User = user2,
                Timestamp = new DateTime(),
                TotalScore = 10
            };
            user2.HighScore = highScore2;

            var user3 = new User()
            {
                Email = "johan@email.se",
                
            };

            Users.Add(user3);

            var highScore3 = new HighScore()
            {
                User = user3,
                Timestamp = new DateTime(),
                TotalScore = 20
            };

            user3.HighScore = highScore3;

    */

            SaveChanges();
        }

       
        }
}
