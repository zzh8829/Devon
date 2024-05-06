import FolderPicker from '@/components/ui/folder-picker'
import { useState, lazy } from 'react'
import { Button } from '@/components/ui/button'
import useCreateSession from '@/lib/services/sessionService/use-create-session'

const Dialog = lazy(() =>
    import('@/components/ui/dialog').then(module => ({
        default: module.Dialog,
    }))
)

const DialogTrigger = lazy(() =>
    import('@/components/ui/dialog').then(module => ({
        default: module.DialogTrigger,
    }))
)

const DialogContent = lazy(() =>
    import('@/components/ui/dialog').then(module => ({
        default: module.DialogContent,
    }))
)

const SelectProjectDirectoryModal = ({ trigger }) => {
    const [folderPath, setFolderPath] = useState('')
    const [open, setOpen] = useState(false)
    const { createSession, sessionId, loading, error } = useCreateSession()

    function validate() {
        return folderPath !== ''
    }

    function handleStartChat() {
        setOpen(false)
        const projectPath = '/Users/josh/Documents/cs/entropy/Devon/examples'
        createSession(projectPath)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <div className="mx-8 my-4">
                    <SelectProjectDirectoryComponent
                        folderPath={folderPath}
                        setFolderPath={setFolderPath}
                    />
                    <StartChatButton
                        disabled={!validate()}
                        onClick={handleStartChat}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SelectProjectDirectoryModal

export const SelectProjectDirectoryComponent = ({
    folderPath,
    setFolderPath,
    className,
}: {
    folderPath: string
    setFolderPath: (path: string) => void
    className?: string
}) => {
    return (
        <div className={`flex flex-col ${className ?? ''}`}>
            <p className="text-xl font-bold mb-4">
                Select your project directory
            </p>
            <FolderPicker
                folderPath={folderPath}
                setFolderPath={setFolderPath}
            />
        </div>
    )
}

export const StartChatButton = ({ onClick, disabled }) => {
    return (
        <Button
            disabled={disabled}
            className="bg-primary text-white p-2 rounded-md mt-10 w-full"
            onClick={onClick}
        >
            Start Chat
        </Button>
    )
}
