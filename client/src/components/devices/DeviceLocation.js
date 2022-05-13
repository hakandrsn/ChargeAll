import React from 'react'
import history from '../../history'
import Modal from '../../modal/Modal'
const DeviceLocation = () => {
  return (
    <Modal
    title="Cihaz konum bilgileri"
    onDismiss={() => history.goBack()}
    actions="aaa"
    content="aa"
    />
  )
}

export default DeviceLocation