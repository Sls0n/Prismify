'use client'

import classes from './style/HamburgerMenu.module.css'

export default function HamburgerMenu() {
  return (
    <>
      <input type="checkbox" id={classes['checkbox']} />
      <label htmlFor={classes['checkbox']} className={classes.toggle}>
        <div className={classes.bars} id={classes['bar1']}></div>
        <div className={classes.bars} id={classes['bar2']}></div>
        <div className={classes.bars} id={classes['bar3']}></div>
      </label>
    </>
  )
}
