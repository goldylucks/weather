import { useEffect, useState } from "react"

const useSetHeight = ({ dependencies, ref }) => {
  const [height, setHeight] = useState("auto")
  useEffect(() => {
    const dummyId = "__dummyContainerForUseSetHeight__"
    let dummyContainer = document.getElementById(dummyId)
    if (!dummyContainer) {
      dummyContainer = document.createElement("div")
      dummyContainer.id = dummyId
      dummyContainer.style.visibility = "hidden"
      // don't occupy space in the page
      dummyContainer.style.position = "absolute"
      document.body.appendChild(dummyContainer)
    }
    // clone the node since nodes are stored by reference, and we later
    // delete it, so we don't want to delete the node we are actually
    // using in our react app (ref)
    const node = ref.current.cloneNode(true)
    node.style.height = "auto"
    dummyContainer.appendChild(node)
    const nextHeight = dummyContainer.clientHeight + 1
    setHeight(nextHeight)
    dummyContainer.innerHTML = ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return height
}

export default useSetHeight
