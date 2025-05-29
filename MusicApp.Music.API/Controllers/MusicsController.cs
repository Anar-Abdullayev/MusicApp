using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MusicApp.Music.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetMusics()
        {
            return Ok("From musics");
        }
    }
}
