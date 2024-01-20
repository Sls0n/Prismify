import classes from './spinner.module.css'

export default function Spinner() {
  return (
    <>
      <svg className={classes.ring} viewBox="25 25 50 50" strokeWidth="5">
        <circle cx="50" cy="50" r="20" />
      </svg>
    </>
  )
}
