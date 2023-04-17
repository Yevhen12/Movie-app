import React from 'react'
import styles from './TotalBox.module.scss'

interface TotalBoxProps {
    title: string
    totalNumber: number
    bgColor: string
    icon: React.ReactElement
}

const TotalBox: React.FC<TotalBoxProps> = ({ title, totalNumber, bgColor, icon }) => {
    return (
        <div className={styles.boxBlock}>
            <div style={{ backgroundColor: bgColor }} className={styles.circleItem}>
                {icon}
            </div>
            <div className={styles.textBlock}>
                <p className={styles.title}>{title}</p>
                <p className={styles.totalText}>{totalNumber}</p>
            </div>
        </div>
    )
}

export default TotalBox