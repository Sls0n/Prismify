import classes from './Checkbox.module.css'

export default function Checkbox() {
  return (
    <label
      className={classes.container}
      tabIndex={0}
      role="checkbox"
      aria-checked="false"
      aria-label="Checkbox"
    >
      <input type="checkbox" tabIndex={-1} />
      <svg viewBox="0 0 64 64" height="20px" width="20px">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className={classes.path}
        ></path>
      </svg>
    </label>
  )
}
