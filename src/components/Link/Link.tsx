import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import './style.scss'

interface CustomLinkProps extends Omit<LinkProps, 'children'> {
  children: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showIcon?: boolean;
  iconType?: 'forward' | 'back';
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  iconPosition = 'right',
  showIcon = true,
  iconType = 'forward',
  ...props
}) => {
  const Icon = ({ className }: {className?: string}) => {
    return (
      <svg
        className={`custom-link__icon ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
      >
        <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
      </svg>
    )
  }

  return (
    <Link {...props} className={`custom-link ${props.className || ''}`}>
      {showIcon && iconPosition === 'left' && <Icon className={iconType === 'back' ? 'back-link' : ''}/>}
      <span className="custom-link__text" style={{ marginLeft: iconPosition === 'right' ? '0' : '' }}>
        {children}
      </span>
      {showIcon && iconPosition === 'right' && <Icon/>}
    </Link>
  )
}