'use client'

// import { Replace, Trash } from 'lucide-react'
import React, { CSSProperties, useReducer } from 'react'
import { Rnd } from 'react-rnd'
// import { Button } from './ui/Button'

interface RndProps {
  children: React.ReactNode
  className?: string
}

enum ACTIONS {
  isResizing = 'isResizing',
  isDragging = 'isDragging',
  isHidden = 'isHidden',
  isHovering = 'isHovering',
}

interface State {
  isResizing: boolean
  isDragging: boolean
  isHidden: boolean
  isHovering: boolean
}

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case ACTIONS.isResizing:
      return { ...state, isResizing: action.payload }
    case ACTIONS.isDragging:
      return { ...state, isDragging: action.payload }
    case ACTIONS.isHidden:
      return { ...state, isHidden: action.payload }
    case ACTIONS.isHovering:
      return { ...state, isHovering: action.payload }
    default:
      return state
  }
}

const CustomizedRnd = ({ children, className }: RndProps) => {
  const [state, dispatch] = useReducer(reducer, {
    isResizing: false,
    isDragging: false,
    isHidden: false,
    isHovering: false,
  })

  const borderStyle: CSSProperties = {
    display: state.isHidden ? 'none' : 'block',
    zIndex: state.isDragging || state.isResizing ? 10000 : 0,
    border: state.isHovering ? '3px solid purple' : '3px solid transparent',
    borderStyle: state.isHovering ? 'dashed' : 'solid',
    borderRadius: '2px',
    cursor: state.isDragging ? 'grabbing' : 'grab',
    position: 'absolute',
    top: '50%',
    left: '50%',
  }

  return (
    <Rnd
      style={borderStyle}
      lockAspectRatio
      onDragStart={() => dispatch({ type: ACTIONS.isDragging, payload: true })}
      onDragStop={() => dispatch({ type: ACTIONS.isDragging, payload: false })}
      onResizeStart={() =>
        dispatch({ type: ACTIONS.isResizing, payload: true })
      }
      onResizeStop={() =>
        dispatch({ type: ACTIONS.isResizing, payload: false })
      }
      onMouseEnter={() => dispatch({ type: ACTIONS.isHovering, payload: true })}
      onMouseLeave={() =>
        dispatch({ type: ACTIONS.isHovering, payload: false })
      }
      className={className}
    >
      {children}
      {state.isHovering && (
        <>
          <div className="absolute -top-11 right-0 z-10 flex gap-2">
            {/* <Button
              variant="outline"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-600 text-white"
            >
              <Replace size={18} />
              Replace
            </Button>
            <Button
              variant="outline"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 text-white"
              onClick={() =>
                dispatch({ type: ACTIONS.isHidden, payload: true })
              }
            >
              <Trash size={18} />
              Delete
            </Button> */}
          </div>
          <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-[2px] border-border bg-[#898aeb]"></div>
          <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full border-[2px] border-border bg-[#898aeb]"></div>
          <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border-[2px] border-border bg-[#898aeb]"></div>
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full border-[2px] border-border bg-[#898aeb]"></div>
          <div className="absolute -right-2 top-1/2 h-4 w-4 border-[2px] border-border bg-[#898aeb]"></div>
          <div className="absolute -left-2 top-1/2 h-4 w-4 border-[2px] border-border bg-[#898aeb]"></div>
        </>
      )}
    </Rnd>
  )
}

export default CustomizedRnd
