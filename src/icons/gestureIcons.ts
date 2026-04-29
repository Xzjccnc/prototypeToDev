import closedFistUrl from '../../gestureIcon/握拳.svg'
import thumbUrl from '../../gestureIcon/大拇指.svg'
import twoFingersUrl from '../../gestureIcon/双指.svg'
import twoFingersSwipeUrl from '../../gestureIcon/双指横移.svg'
import twoFingersPinchOpenUrl from '../../gestureIcon/双指捏开.svg'
import twoFingersPinchCloseUrl from '../../gestureIcon/双指捏合.svg'
import oneFingerSwipeUrl from '../../gestureIcon/单指横移.svg'
import oneFingerUrl from '../../gestureIcon/单指.svg'
import okUrl from '../../gestureIcon/ok.svg'
import threeFingersUrl from '../../gestureIcon/三指.svg'

/** Maps each MediaPipe/custom gesture name to its SVG asset URL. */
export const GESTURE_ICON_MAP: Record<string, string> = {
  Closed_Fist: closedFistUrl,
  Open_Palm: okUrl,
  Swipe_Up: oneFingerSwipeUrl,
  Swipe_Down: oneFingerSwipeUrl,
  Pointing_Up: oneFingerUrl,
  Victory: twoFingersUrl,
  ILoveYou: threeFingersUrl,
  Thumb_Up: thumbUrl,
  Thumb_Down: thumbUrl,
}

/** Human-readable Chinese labels for each gesture. */
export const GESTURE_LABEL_MAP: Record<string, string> = {
  Closed_Fist: '握拳',
  Open_Palm: '张开手掌',
  Swipe_Up: '向上滑动',
  Swipe_Down: '向下滑动',
  Pointing_Up: '单指指向',
  Victory: '双指手势',
  ILoveYou: '三指手势',
  Thumb_Up: '拇指向上',
  Thumb_Down: '拇指向下',
}

/** All exported SVG URLs (for reference / future use). */
export {
  closedFistUrl,
  thumbUrl,
  twoFingersUrl,
  twoFingersSwipeUrl,
  twoFingersPinchOpenUrl,
  twoFingersPinchCloseUrl,
  oneFingerSwipeUrl,
  oneFingerUrl,
  okUrl,
  threeFingersUrl,
}
