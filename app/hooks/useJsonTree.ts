import { useState, useCallback } from 'react'
import { useNodesState, useEdgesState, Node, Edge } from '@xyflow/react'
import { buildJsonTree, parseJsonPath } from '../utils/jsonTreeBuilder'

export const useJsonTree = () => {
  const [treeNodes, setTreeNodes, handleNodeChanges] = useNodesState<Node>([])
  const [treeEdges, setTreeEdges, handleEdgeChanges] = useEdgesState<Edge>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const makeTree = useCallback((input: string) => {
    try {
      const data = JSON.parse(input)
      setErrorMsg('')

      const stuff = buildJsonTree(data)
      setTreeNodes(stuff.nodes)
      setTreeEdges(stuff.edges)
      setSelectedNode(null)
      
      return true
    } catch (e: any) {
      setErrorMsg('Bad JSON: ' + e.message)
      setTreeNodes([])
      setTreeEdges([])
      return false
    }
  }, []);

  const findInTree = useCallback((query: string): string | null => {
    if (!query) return null

    try {
      const parts = parseJsonPath(query)
      let path = '$'
      
      if (parts.length) {
        path = '$.' + parts.join('.')
      }

      const found = treeNodes.find(n => {
        const d = n.data as any
        const p = d.path.replace(/\[(\d+)\]/g, '.$1')
        return p === path || d.path === query.replace(/^\$\.?/, '')
      })

      if (found) {
        setSelectedNode(found.id)
        
        setTimeout(() => {
          const el = document.querySelector(`[data-id="${found.id}"]`)
          el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
        }, 100)
        
        return found.id
      }
      
      setSelectedNode(null)
      return null
    } catch (e) {
      setSelectedNode(null)
      return null
    }
  }, [treeNodes]);

  const resetSelection = useCallback(() => {
    setSelectedNode(null)
  }, [])

  return {
    nodes: treeNodes,
    edges: treeEdges,
    onNodesChange: handleNodeChanges,
    onEdgesChange: handleEdgeChanges,
    error: errorMsg,
    highlightedNodeId: selectedNode,
    generateTree: makeTree,
    searchNode: findInTree,
    clearHighlight: resetSelection,
  }
}
