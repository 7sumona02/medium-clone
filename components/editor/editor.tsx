'use client'

import { useState } from 'react'
// import { useDebouncedCallback } from 'use-debounce'

import { cn } from '@/lib/utils'
import { Post } from '@/lib/types'

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
  ImageResizer,
  type JSONContent
} from 'novel'

import EditorMenu from '@/components/editor/editor-menu'
import { uploadFn } from '@/components/editor/image-upload'
import { defaultExtensions } from '@/components/editor/extensions'
import { TextButtons } from '@/components/editor/selectors/text-buttons'
import { LinkSelector } from '@/components/editor/selectors/link-selector'
import { NodeSelector } from '@/components/editor/selectors/node-selector'
import { MathSelector } from '@/components/editor/selectors/math-selector'
import { ColorSelector } from '@/components/editor/selectors/color-selector'

import { Separator } from '@/components/ui/separator'
import { slashCommand, suggestionItems } from './slash-command'

const extensions = [...defaultExtensions, slashCommand]

export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface EditorProps {
  post?: Post
  editable?: boolean
  setContent?: (content: JSONContent) => void
}

export default function Editor({
  post,
  editable = true,
  setContent
}: EditorProps) {
  // const [initialContent, setInitialContent] = useState<null | JSONContent>(null)
  const [, setSaveStatus] = useState('Saved')

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)

  const initialContent = post?.content
    ? JSON.parse(post.content)
    : defaultEditorContent

  if (!initialContent) return null

  return (
    <div className='relative w-full max-w-screen-lg'>
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={initialContent}
          extensions={extensions}
          className={cn(
            'relative w-full max-w-screen-lg bg-background',
            editable
              ? 'h-[450px] overflow-scroll rounded-md border border-input shadow-sm'
              : 'min-h-[500px]'
          )}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ${editable ? 'cursor-text text-sm' : 'cursor-default !p-0'}`
            }
          }}
          onUpdate={({ editor }) => {
            // debouncedUpdates(editor)
            setSaveStatus('Unsaved')
            if (setContent) setContent(editor.getJSON())
          }}
          onCreate={({ editor }) => {
            if (!editable) editor.setEditable(editable)
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map(item => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={val => item.command?.(val)}
                  className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorMenu open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation='vertical' />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />

            <Separator orientation='vertical' />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />

            <Separator orientation='vertical' />
            <MathSelector />

            <Separator orientation='vertical' />
            <TextButtons />

            <Separator orientation='vertical' />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorMenu>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}
