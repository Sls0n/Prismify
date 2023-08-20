import classes from './Loader.module.css'

export default function Loader() {
  return (
    <>
      <svg className={classes.ring} viewBox="25 25 50 50" strokeWidth="5">
        <circle cx="50" cy="50" r="20" />
      </svg>
    </>
  )
}
