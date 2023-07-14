import classes from './style/ToggleSwitch.module.css'

export default function ToggleSwitch() {
  return (
    <label className={classes.switch}>
      <input type="checkbox" className={classes.checkbox} />
      <span className={classes.slider}></span>
    </label>
  )
}
