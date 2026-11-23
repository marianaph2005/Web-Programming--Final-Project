//JavaScript Requirements:
// 1. Interactive Menu Description: Show/Hide food item description on click
function toggleDescription(descId) {
  const descElement = document.getElementById(descId);
  const cardContent = descElement.closest('.card-content');
  const toggleBtn = cardContent.querySelector('.btn-outline');

  if (descElement.hidden) {
    descElement.hidden = false;
    toggleBtn.textContent = "Hide Description";
  } else {
    descElement.hidden = true;
    toggleBtn.textContent = "View Description";
  }
}