import React, { useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios'

import Node from '../node/Node';
import Edge from '../edge/Edge';
import DateTimePicker from '../date-time-picker/DateTimePicker';
import SideDrawer from '../side-drawer/SideDrawer';
import Select from '../select/Select';

import '../../styles/index.css'
import 'reactflow/dist/style.css';
import SideMenu from '../side-menu/SideMenu';

const startInputXRight = 100
const startInputXLeft = -100
const startOutputXRight = 100
const startOutputXLeft = -100
const xEllipse = 1000
const yEllipse = 500
const range = 200
let isInputRightTurn = true
let isOutputLeftTurn = true
let inputXRight = startInputXRight
let inputXLeft = startInputXLeft
let outputXRight = startOutputXRight
let outputXLeft = startOutputXLeft

const edgeTypes = {
  edge: Edge,
};
const nodeTypes = {
  node: Node,
}
const calculateYCoordinate = (x) => {
  return -Math.sqrt(((1 - x * x / (xEllipse * xEllipse)) * yEllipse * yEllipse))
}

const Analysis = () => {
  const [loading, setLoading] = useState(true)
  const loadingAttribute = {
    ...(loading ? { opacity: '0.8' } : { opacity: 1 })
  }
  const [instance, setInstance] = useState(null)
  const onInit = (i) => {
    setInstance(i)
  }

  // const [, setData] = useState([])
  const [exchanges, setExchanges] = useState([])
  const [tokens, setTokens] = useState([])
  const [sideDrawerData, setSideDrawerData] = useState([])
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [filterStartTime, setFilterStartTime] = useState(null)
  const [filterEndTime, setFilterEndTime] = useState(null)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const onOpenSideDrawer = (sdData, transactionHash, isComposite, isInput) => {
    if (isComposite) {
      if (isInput) {
        setSideDrawerData(sdData['composite-buy'])
      } else {
        setSideDrawerData(sdData['composite-sell'])
      }
    } else {
      setSideDrawerData(sdData[transactionHash])
    }
    setSideDrawerOpen(true)
  };
  const onCloseSideDrawer = () => {
    setSideDrawerOpen(false);
  };

  const handleChangeExchange = (value) => {
    let n = [...nodes]
    if (value === undefined) {
      setEdges([])
      setNodes([])
      return
    }

    let e = exchanges.filter((exchange) => {
      return exchange.name === value
    })

    if (n.length === 0) {
      setNodes([{
        id: '1',
        type: 'default',
        data: {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <img src={e[0].image} alt="logo" />
            </div>
          ),
        },
        position: { x: 0, y: 0 },
      }])
      return
    }

    n.map((node) => {
      if (node.id === '1') {
        node.data = {
          ...node.data,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <img src={e[0].image} alt="exchange-logo" />
            </div>
          ),
        };
      }

      return node;
    })

    setNodes(n)
  }
  const addNewNode = (label, address, isComposite, isInput, value, src, transactionHash, sdData) => {
    if (isInput) {
      if (isInputRightTurn) {
        let y = calculateYCoordinate(inputXRight)
        let id = (inputXRight - startInputXRight) / range + 2
        let newNode = {
          id: `${id}`,
          type: 'node',
          data: {
            label: label,
            onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
            address: address,
            isComposite: isComposite,
            isInput: isInput,
          },
          position: { x: inputXRight, y: y },
        }
        let newEdge = {
          id: `${id}-1`, source: `${id}`, target: '1', animated: true, type: 'edge',
          data: {
            value: value,
            src: src,
            alt: address,
            onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
            isComposite: isComposite,
          }
        }
        inputXRight += range
        isInputRightTurn = !isInputRightTurn

        return { newNode, newEdge }
      }

      let y = calculateYCoordinate(inputXLeft)
      let id = (startInputXLeft - inputXLeft) / range + 7
      let newNode = {
        id: `${id}`,
        type: 'node',
        data: {
          label: label,
          onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
          address: address,
          isComposite: isComposite,
          isInput: isInput,
        },
        position: { x: inputXLeft, y: y },
      }
      let newEdge = {
        id: `${id}-1`, source: `${id}`, target: '1', animated: true, type: 'edge',
        data: {
          value: value,
          src: src,
          alt: address,
          onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
          isComposite: isComposite,
        }
      }
      inputXLeft -= range
      isInputRightTurn = !isInputRightTurn

      return { newNode, newEdge }
    }

    if (isOutputLeftTurn) {
      let y = calculateYCoordinate(outputXLeft)
      let id = (startOutputXLeft - outputXLeft) / range + 12
      let newNode = {
        id: `${id}`,
        type: 'node',
        data: {
          label: label,
          onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
          address: address,
          isComposite: isComposite,
          isInput: isInput,
        },
        position: { x: outputXLeft, y: -y },
      }
      let newEdge = {
        id: `1-${id}`, source: '1', target: `${id}`, animated: true, type: 'edge',
        data: {
          value: value,
          src: src,
          alt: address,
          onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
          isComposite: isComposite,
        }
      }
      outputXLeft -= range
      isOutputLeftTurn = !isOutputLeftTurn

      return { newNode, newEdge }
    }

    let y = calculateYCoordinate(outputXRight)
    let id = (outputXRight - startOutputXRight) / range + 17
    let newNode = {
      id: `${id}`,
      type: 'node',
      data: {
        label: label,
        onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
        address: address,
        isComposite: isComposite,
        isInput: isInput,
      },
      position: { x: outputXRight, y: -y },
    }
    let newEdge = {
      id: `1-${id}`, source: '1', target: `${id}`, animated: true, type: 'edge',
      data: {
        value: value,
        src: src,
        alt: address,
        onClick: () => onOpenSideDrawer(sdData, transactionHash, isComposite, isInput),
        isComposite: isComposite,
      }
    }
    outputXRight += range
    isOutputLeftTurn = !isOutputLeftTurn

    return { newNode, newEdge }
  }

  const addNewNodes = (data, sdData) => {
    let newNodes = []
    let newEdges = []
    for (let i = 0; i < data.length; i++) {
      let d = data[i]
      let { newNode, newEdge } = addNewNode(d.label, d.address, d.is_composite, d.is_input, d.value, d.image, d.transaction_hash, sdData)
      newNodes.push(newNode)
      newEdges.push(newEdge)
    }


    setEdges([...edges, ...newEdges])
    setNodes([...nodes, ...newNodes])
    let i = instance
    i.zoomTo(0.75)
    setInstance(i)
  }

  const handleDateTimeChange = (value) => {
    console.log('Selected Time: ', value);
    setFilterStartTime("start time")
    setFilterEndTime("end time")
  }


  // const callAPI = async () => {
  //   if (!filterStartTime && !filterEndTime) {
  //     setEdges([])
  //     setNodes([nodes[0]])
  //   }
  //   if (!filterStartTime || !filterEndTime) {
  //     return
  //   }
  // }

  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      await axios.get("http://0.0.0.0:8096/exchanges/").then((resp) => {
        setExchanges(resp.data.exchanges)
      }).catch((err) => {
        console.log(err)
      })

      await axios.get("http://0.0.0.0:8096/tokens/").then((resp) => {
        setTokens(resp.data.tokens)
      }).catch((err) => {
        console.log(err)
      })

      setLoading(false)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      await axios.get("http://0.0.0.0:8096/snapshots/").then((resp) => {
        setSideDrawerData(resp.data.side_drawer_data)
        addNewNodes(resp.data.trans_data, resp.data.side_drawer_data)
        isInputRightTurn = true
        isOutputLeftTurn = true
        inputXRight = startInputXRight
        inputXLeft = startInputXLeft
        outputXRight = startOutputXRight
        outputXLeft = startOutputXLeft
        // setData(resp.data.trans_data)
      }).catch((err) => {
        console.log(err)
      })
      setLoading(false)
    }

    if (filterStartTime != null && filterEndTime != null) {
      getData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStartTime, filterEndTime])

  return (
    <div>
      {
        loading ? <div style={{
          position: 'absolute', width: '100%', height: '100vh', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
          <div>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
          </div>
        </div> : ""
      }
      <div style={loadingAttribute}>
        <div style={{ right: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
          <DateTimePicker onChange={handleDateTimeChange} />
        </div>
        <div style={{ right: '750px', top: '20px', zIndex: '2', position: 'absolute' }}>
          <Select data={exchanges} onChange={handleChangeExchange} type="Exchange" width={300} maxSymbolLength={30} />
        </div>
        <div style={{ right: '400px', top: '20px', zIndex: '2', position: 'absolute' }}>
          <Select data={tokens} type="Token" width={300} maxSymbolLength={30} />
        </div>
        <div style={{ left: '20px', top: '20px', zIndex: '2', position: 'absolute' }}>
          <SideMenu />
        </div>
        <div>
          <SideDrawer
            sideDrawerOpen={sideDrawerOpen}
            onCloseSideDrawer={onCloseSideDrawer}
            transactionData={sideDrawerData}
          />
          <div style={{ height: '100vh' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              edgeTypes={edgeTypes}
              nodeTypes={nodeTypes}
              nodesDraggable={true}
              onInit={onInit}
              fitView
            >
              <MiniMap zoomable pannable />
              <Controls showInteractive={false} />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Analysis;
