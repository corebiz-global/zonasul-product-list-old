import React, { FunctionComponent } from 'react'
import { Loading } from 'vtex.render-runtime'
import { Item } from 'vtex.checkout-graphql'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import { NoImageIcon } from './components/NoImageIcon'
import { opaque } from './utils/opaque'

const getImageUrl = (imageUrls: Item['imageUrls']) => {
  if (!imageUrls) {
    return null
  }
  if (!window || !window.devicePixelRatio) {
    return imageUrls.at1x
  }

  if (window.devicePixelRatio <= 1.25) {
    return imageUrls.at1x
  } else if (window.devicePixelRatio <= 2.25) {
    return imageUrls.at2x
  } else {
    return imageUrls.at3x
  }
}

const CSS_HANDLES = [
  'productImageContainer',
  'productImageAnchor',
  'productImage',
] as const

interface ImageProps {
  width?: number
}

const Image: FunctionComponent<ImageProps> = ({ width = 96 }) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  const imageUrl = getImageUrl(item.imageUrls)

  return (
    <div
      id={`image-${item.id}`}
      className={`${handles.productImageContainer} ${opaque(
        item.availability
      )}`}
      style={{ width }}
    >
      <a
        className={handles.productImageAnchor}
        href={item.detailUrl || undefined}
      >
        {imageUrl ? (
          <img
            className={`${handles.productImage} br2`}
            alt={item.name || undefined}
            src={imageUrl}
            width="100%"
          />
        ) : (
          <NoImageIcon />
        )}
      </a>
    </div>
  )
}

export default Image
