import anime from 'animejs';

export default function CardAnimation(props) {
  if (props.cardOpen) {
    anime({
      targets: document.getElementById(props.onClickKey),
      height: props.cardPrevHeight,
      easing: 'easeInOutQuad',
      duration: 100,
    });
    props.setCardOpen(false);
  } else if (!props.cardOpen) {
    props.setCardPrevHeight(anime.getValue(document.getElementById(props.onClickKey), 'height'));
    anime({
      targets: document.getElementById(props.onClickKey),
      height: 200,
      easing: 'easeInOutQuad',
      duration: 100,
    });
    props.setCardOpen(true);
  }
}
