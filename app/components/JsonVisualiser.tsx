'use client';

import { useState, useMemo } from 'react';
import '@xyflow/react/dist/style.css';
import JsonInput from './JsonInput'
import TreeVisualization from './TreeVisualization'
import { useJsonTree } from '../hooks/useJsonTree'
import SearchPanel from './SearchPanel'
import PopupIndex from './PopupIndex'

// pre-loaded data .
const defaultData = {
    user: {
        name: 'Himesh Parashar',
        age: 21,
        active: true, 
        location: {
            street: 'A-2 Block',
            city: 'Bikaner',
            pin: '334001', 
        },
    },
    cart: [
        { id: 1, item: 'Coffee', cost: 80 },
        { id: 2, item: 'Red Bull', cost: 120 },
    ],
    tech: ['JS', 'TS', 'React', 'Node'],
    meta: {
        ver: '1.0',
        time: '28 Oct 2025', 
    },
}

export default function JsonVisualiser() {
  const [input, setInput] = useState(JSON.stringify(defaultData, null, 2))
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const tree = useJsonTree()

  const makeTreeFromInput = () => {
    const ok = tree.generateTree(input)
    if(ok) setResult('')
  }

  const doSearch = () => {
    if(!query) {
      setResult('type something first!')
      return
    }

    const found = tree.searchNode(query)
    if(!found) {
      setResult('nothing found :(')
    } else {
      setResult('found it!')
    }
  }


  const prettyNodes = useMemo(() => {
    return tree.nodes.map(n => ({
      ...n,
      style: {
        ...n.style,
        border: n.id === tree.highlightedNodeId
          ? '4px solid #ff4444'
          : '2px solid white',
        boxShadow: n.id === tree.highlightedNodeId
          ? '0 0 20px #ff444499'
          : 'none',
      },
    }))
  }, [tree.nodes, tree.highlightedNodeId])

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="bg-green-700 text-white p-4 shadow-lg justify-center items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-2">JSON Tree Visualiser</h1>
        <p className="text-sm text-gray-300">
          Paste your JSON data and visualise its structure
        </p>
      </div>

      <div className="flex flex-col lg:flex-row h-full">


        <div className="w-full lg:w-2/3 h-96 lg:h-auto relative bg-gray-100">
          <TreeVisualization
            nodes={prettyNodes}
            edges={tree.edges}
            onNodesChange={tree.onNodesChange}
            onEdgesChange={tree.onEdgesChange}
          />
        </div>
        <div className="w-full lg:w-1/3 p-4 bg-gray-50 border-r border-gray-200 flex flex-col">
          <JsonInput
            value={input}
            onChange={setInput}
            onGenerate={makeTreeFromInput}
            error={tree.error}
          />

          <SearchPanel 
            searchQuery={query}
            onSearchChange={setQuery}
            onSearch={doSearch}
            searchResult={result}
          />

          <PopupIndex />
        </div>

      </div>
    </div>
  );
}
