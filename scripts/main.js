let nav = false;

const handleClick = () => {
  nav = !nav;
  if (!nav) {
    document.querySelector('.hMenu i').classList.remove('fa-times');
    document.querySelector('.hMenu i').classList.add('fa-bars');
  } else {
    document.querySelector('.hMenu i').classList.remove('fa-bars');
    document.querySelector('.hMenu i').classList.add('fa-times');
  }
};