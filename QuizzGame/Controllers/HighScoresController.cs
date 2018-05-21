﻿using System;
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
    [Route("api/HighScores")]
    public class HighScoresController : Controller
    {
        private readonly QuizzGameContext _context;

        public HighScoresController(QuizzGameContext context)
        {
            _context = context;
        }

        // GET: api/HighScores
        [HttpGet]
        public IEnumerable<HighScore> GetHighScore()
        {
            return _context.HighScore;
        }

        // GET: api/HighScores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHighScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var highScore = await _context.HighScore.SingleOrDefaultAsync(m => m.id == id);

            if (highScore == null)
            {
                return NotFound();
            }

            return Ok(highScore);
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
        [HttpPost]
        public async Task<IActionResult> PostHighScore([FromBody] HighScore highScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.HighScore.Add(highScore);
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

            var highScore = await _context.HighScore.SingleOrDefaultAsync(m => m.id == id);
            if (highScore == null)
            {
                return NotFound();
            }

            _context.HighScore.Remove(highScore);
            await _context.SaveChangesAsync();

            return Ok(highScore);
        }

        private bool HighScoreExists(int id)
        {
            return _context.HighScore.Any(e => e.id == id);
        }
    }
}