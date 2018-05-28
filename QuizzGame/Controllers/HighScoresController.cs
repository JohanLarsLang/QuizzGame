using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        public HighScoresController(QuizzGameContext context)
        {
            _context = context;
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
        public async Task<IActionResult> AddHigscore(string ActualUserEmail, DateTime NewTimeStamp, int NewTotalScore)
        {

            var user = from x in _context.HighScores
                         where x.User.Email == ActualUserEmail
                         select x.User.Id;

          //var highscore = await _context.HighScores.SingleOrDefaultAsync(e => e.User == user);

            
            
            HighScore highscore = new HighScore()
            {
                User = (User)user,
                Timestamp = NewTimeStamp,
                TotalScore = NewTotalScore

            };
            
            

           // highscore.Timestamp = NewTimeStamp;
           // highscore.TotalScore = NewTotalScore;
                
  

            try
            {
        
                _context.HighScores.Add(highscore);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex);
            }


            return Ok(highscore);
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