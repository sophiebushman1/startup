html notes:
<img src="" width="" >
<a href="">TEXT NAME </a>
<tr>
  <tb> </tb>
</tr>
value="#ff000"

css notes:
code pen:
p {
  color:red;
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  75% {
    font-size: 300%;
    margin-left: 25%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

.box {
  background-color: rebeccapurple;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  animation-name: rotate;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

/**
 * `@property` is required for the animation to work.
 * Without it, the angle values won’t interpolate properly.
 *
 * @see https://dev.to/afif/we-can-finally-animate-css-gradient-kdk
 */
@property --bg-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}

/**
 * To animate the gradient, we set the custom property to 1 full
 * rotation. The animation starts at the default value of `0deg`.
 */
@keyframes spin {
  to {
    --bg-angle: 360deg;
  }
}


article {
  color:white;
  /* add the animation, but pause it by default */
  animation: spin 2.5s infinite linear paused;
  
  /**
   * Using `background-origin` we can create a “border” using two gradients. And to
   * make the gradients better-looking, we use OKLCH.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
   * @see https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
   */
  background:
    /* Background colors don’t work with `background-origin`, so use a gradient. */
    linear-gradient(
        to bottom,
        oklch(0.1 0.2 240 / 0.95),
        oklch(0.1 0.2 240 / 0.95)
      )
      padding-box, /* ends at inner border edges */
    conic-gradient(
        from var(--bg-angle) in oklch,
        oklch(1 0.37 0),
        oklch(1 0.37 60),
        oklch(1 0.37 120),
        oklch(1 0.37 180),
        oklch(1 0.37 240),
        oklch(1 0.37 300),
        oklch(1 0.37 360)
      )
      border-box; /* extends to outer border edges */
  
  /* a clear border lets the background gradient shine through */
  border: 6px solid transparent;

  /* unpause the animation on hover */
  &:hover {
    animation-play-state: running;
  }
}
