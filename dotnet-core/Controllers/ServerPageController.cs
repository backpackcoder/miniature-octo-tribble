using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MvcApp.Models;

namespace MvcApp.Controllers
{
    public class ServerPageController : Controller
    {
        private readonly WebAppDbContext _context;

        public ServerPageController(WebAppDbContext context) {
            _context = context;
        }

        async public Task<IActionResult> Index()
        {
            return View(await _context.Churches.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Lat,Lng")] Church church)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Add(church);
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");
            }
            return View(church);
        }
        

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var church = await _context.Churches.SingleOrDefaultAsync(m => m.Id == id);
            if (church == null)
            {
                return NotFound();
            }
            return View(church);
        }

        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPost(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var churchToUpdate = await _context.Churches.SingleOrDefaultAsync(s => s.Id == id);
            if (await TryUpdateModelAsync<Church>(churchToUpdate))
            {
                try
                {
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
                catch (DbUpdateException /* ex */)
                {
                    //Log the error (uncomment ex variable name and write a log.)
                    ModelState.AddModelError("", "Unable to save changes. " +
                        "Try again, and if the problem persists, " +
                        "see your system administrator.");
                }
            }
            return View(churchToUpdate);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var church = await _context.Churches
                .AsNoTracking()
                .SingleOrDefaultAsync(m => m.Id == id);
            if (church == null)
            {
                return RedirectToAction("Index");
            }

            try
            {
                _context.Churches.Remove(church);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.)
                return RedirectToAction("Index");
            }
        }
    }
}
