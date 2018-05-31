using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzGame.Data;
using QuizzGame.Models;


namespace QuizzGame.Controllers
{
    [Produces("application/json")]
    //[Route("api/HighScores")]
    public class HighScoresController : Controller
    {
        private readonly QuizzGameContext _context;
        private readonly UserManager<User> _userManager;

        public HighScoresController(QuizzGameContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET:
        [Route("api/GetHighScores")]
        [HttpGet]
        public IActionResult GetHighScore()
        {

            var allHighscores = from x in _context.HighScores
                                orderby x.TotalScore descending
                                select new
                                {
                                    x.TotalScore,
                                    x.Timestamp,
                                    x.User.Email
                                };

            return Ok(allHighscores);

        }

        // GET: api/HighScores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHighScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var highScore = await _context.HighScores.SingleOrDefaultAsync(m => m.id == id);

            if (highScore == null)
            {
                return NotFound();
            }

            return Ok(highScore);
        }

        [Route("api/Highscore/Add")]
        [HttpGet]
        public async Task<IActionResult> AddHigscore(string UserEmail, int NewTotalScore)
        {
            string trim = UserEmail.Substring(0, UserEmail.LastIndexOf("P"));
           

            var UserEmailTrim = trim.Substring(trim.IndexOf(':') + 1);

            UserEmail = UserEmailTrim.Replace(" ", string.Empty);

            var userEmails = from x in _context.HighScores.Include(u => u.User)
                             select x.User.Email;

             
            bool userExistInHigscore = false;

            foreach (var x in userEmails)
            {
                if (x == UserEmail)
                    userExistInHigscore = true;
            }

            if (userExistInHigscore == true)
            {
                
                var user = (from x in _context.HighScores.Include(u => u.User)
                            where x.User.Email == UserEmail
                            select x.User).First();

                var userScore = (from x in _context.HighScores.Include(u => u.User)
                                 where x.User.Email == UserEmail
                                 select x.TotalScore).First();

    
                var highscore = await _context.HighScores.SingleOrDefaultAsync(e => e.User.Email == UserEmail);

                highscore.User = user;
                highscore.Timestamp = DateTime.Today;
                highscore.TotalScore = NewTotalScore;

                try
                {
                    if (NewTotalScore > userScore)
                        await _context.SaveChangesAsync();

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Message: " + ex);
                }
            }

            else
            {
                var user = await _userManager.GetUserAsync(User);


                HighScore highscore = new HighScore()
                {
                    User = user,
                    Timestamp = DateTime.Today,
                    TotalScore = NewTotalScore

                };

                try
                {

                    _context.HighScores.Add(highscore);
                    await _context.SaveChangesAsync();

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Message: " + ex);
                }
            }


            return NoContent();
        }

        [Route("api/HighScore/CountNr")]
        [HttpGet]
        public int GetCountNrHighScore(string UserEmail)
        {
            // var userId = _userManager.GetUserId(User);

            UserEmail = UserEmail.Replace(" ", string.Empty);

            var userIdOrderdByHighScore = from x in _context.HighScores.Include(u => u.User)
                                              orderby x.TotalScore descending
                                              select x.User.Email;

            int nrInHihgScore = 0;
            int counter = 1;

            foreach (var x in userIdOrderdByHighScore)
            {
                if (x == UserEmail)
                {
                    nrInHihgScore = counter;
                }

                counter++;
            }

            return nrInHihgScore;
        }

        // PUT: api/HighScores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHighScore([FromRoute] int id, [FromBody] HighScore highScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != highScore.id)
            {
                return BadRequest();
            }

            _context.Entry(highScore).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HighScoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HighScores
        [Route("api/Highscore/Post")]
        [HttpPost]
        public async Task<IActionResult> PostHighScore([FromBody] HighScore highScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            highScore.Timestamp = DateTime.Now;


            _context.HighScores.Add(highScore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHighScore", new { id = highScore.id }, highScore);
        }

        // DELETE: api/HighScores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHighScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var highScore = await _context.HighScores.SingleOrDefaultAsync(m => m.id == id);
            if (highScore == null)
            {
                return NotFound();
            }

            _context.HighScores.Remove(highScore);
            await _context.SaveChangesAsync();

            return Ok(highScore);
        }

        private bool HighScoreExists(int id)
        {
            return _context.HighScores.Any(e => e.id == id);
        }
    }
}