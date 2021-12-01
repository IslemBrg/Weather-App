import React from 'react'
import Image from 'next/image'

export default function Background() {
    return (
        <div className="imge">
            <Image
                src="/../public/images/background.jpg"
                alt="background"
                layout='fill'
            />
        </div>
    )
}
