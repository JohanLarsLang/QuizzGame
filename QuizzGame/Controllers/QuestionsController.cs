using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzGame.Data;
using QuizzGame.Models;
using QuizzGame.Models.ViewModel;

namespace QuizzGame.Controllers
{
    [Produces("application/json")]
    //[Route("api/Questions")]
    public class QuestionsController : Controller
    {
        private readonly QuizzGameContext _context;

        public QuestionsController(QuizzGameContext context)
        {
            _context = context;
        }

        // GET: api/Questions/Count
        [Route("api/Questions/Count")]
        [HttpGet]
        public int GetCountQuestions()
        {
            int nrOfQuestions = _context.Questions.Count();
            return nrOfQuestions;
        }

        // GET: api/Questions
        [Route("api/GetQuestions")]
        [HttpGet]
        public IEnumerable<Question> GetQuestions()
        {
            return _context.Questions;
        }

        // GET: api/GetQuestionInfo/1
        [Route("api/GetQuestionInfo")]
        [HttpGet]
        public async Task<QuestionViewModel> GetQuestionInfo(int currentId)
        {

           // var q = _context.Questions.First();

           var q = await _context.Questions.SingleOrDefaultAsync(m => m.Id ==currentId);

            QuestionViewModel question = new QuestionViewModel()
            {
                QuizzEng = q.QuizzEng,
                QuizzSwe = q.QuizzSwe,
                Correct = q.Correct,
                Score = q.Score

            };

            return question;
        }

        // GET: api/GetQuestion/5
        [Route("api/GetQuestion")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }


        // PUT: api/Questions/5
        //[Route("api/Questions/Modify")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // ADD:

        [Route("api/Questions/Add")]
        [HttpGet]
        public async Task<IActionResult> PostQuestion(string NewQuestionEng, string NewQuestionSwe, bool NewCorrect, int NewScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Question question = new Question()
            {
                QuizzEng = NewQuestionEng,
                QuizzSwe = NewQuestionSwe,
                Correct = NewCorrect,
                Score = NewScore
            };


            try
            {
                _context.Questions.Add(question);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex);
            }


            return Ok(question);
        }

        // MODIFY:

        [Route("api/Questions/Modify")]
        [HttpGet]
        public async Task<IActionResult> ModifyQuestion(int actualId, string NewQuestionEng, string NewQuestionSwe, bool NewCorrect, int NewScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == actualId);

            if (question == null)
            {
                return NotFound();
            }

            question.QuizzEng = NewQuestionEng;
            question.QuizzSwe = NewQuestionSwe;
            question.Correct = NewCorrect;
            question.Score = NewScore;
                     

            try
            {
                //_context.Questions.Remove(question);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex);
            }


            return Ok(question);
        }


        // DELETE:

        [Route("api/Questions/Delete")]
        [HttpGet]
        public async Task<IActionResult> DeleteQuestion(int actualId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == actualId);

            if (question == null)
            {
                return NotFound();
            }

            try
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex);
            }
          

            return Ok(question);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}