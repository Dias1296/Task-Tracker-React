using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool isCompleted { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
    }
}
