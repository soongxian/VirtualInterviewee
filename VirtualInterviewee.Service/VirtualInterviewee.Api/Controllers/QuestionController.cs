using MediatR;
using Microsoft.AspNetCore.Mvc;
using VirtualInterviewee.Application;

namespace VirtualInterviewee.Api.Controllers
{
    [Route("api/question")]
    [ApiController]
    public class QuestionController(IMediator mediator) : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(SendQuestionResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostQuestion([FromBody] SendQuestionCommand command, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(command, cancellationToken);
            return Ok(result);
        }
    }
}
