import { Box, Divider, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { RegisterOptions, useController } from 'react-hook-form'
import Dropzone, { Accept } from 'react-dropzone'
import { DeleteIcon } from '@chakra-ui/icons'

import { IMAGE_MIME_TYPES, VIDEO_MIME_TYPES } from 'constant'
import FormControl from './FormControl'
import IconButton from '../IconButton'

type Props = {
  name: string
  label?: string
  imageOnly?: boolean
  isRequired?: boolean
  rules?: RegisterOptions
  accept?: Accept
}

type UploadedFile = {
  path: string
  url: string
  name: string
  type: string
}

const FormUploadDropZone = ({
  name,
  imageOnly,
  isRequired,
  rules,
  accept,
  label,
}: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: { required: isRequired ? 'is required' : false, ...rules },
    defaultValue: '',
  })

  async function handleAcceptedFiles(files: any[]) {
    if (!files.length) return
    const newFiles = files.map((file) => {
      return {
        path: file.path,
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }
    })
    field.onChange([...field.value, ...newFiles])
  }

  const getAcceptedMimeTypes = (): Record<string, string[]> => {
    if (imageOnly) return { 'image/*': IMAGE_MIME_TYPES }
    return {
      'image/*': IMAGE_MIME_TYPES,
      'video/*': VIDEO_MIME_TYPES,
    }
  }

  const handleDeleteFile = (fileIdx: number) => {
    const newValue = field.value.filter(
      (_: UploadedFile, idx: number) => idx !== fileIdx
    )
    field.onChange(newValue)
  }

  return (
    <Box w="100%">
      <FormControl
        name={name}
        label={label}
        error={error}
        isRequired={isRequired}
      >
        <Dropzone
          accept={accept || getAcceptedMimeTypes()}
          onDrop={handleAcceptedFiles}
          {...field}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              border="1px"
              borderStyle="dashed"
              borderColor="gray.200"
              rounded="md"
              p="4"
              w="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
              height="100px"
              className="dz-message needsclick"
              cursor="pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="dz-message needsclick">
                <div className="mb-3">
                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                </div>
                <Text color="gray.400">
                  Drop files here or click to upload.
                </Text>
              </div>
            </Box>
          )}
        </Dropzone>
      </FormControl>
      {!!field.value.length && (
        <VStack
          alignItems="flex-start"
          mt={4}
          border="1px solid"
          borderColor="gray.100"
          rounded="md"
          p={4}
          divider={<Divider />}
        >
          {field.value.map((file: UploadedFile, fileIdx: number) => {
            const isImage = file.type.startsWith('image')
            const imageUrl = file.url
            return (
              <HStack key={file.name} justifyContent="space-between" w="100%">
                <Box>
                  {isImage ? (
                    <Image
                      src={imageUrl}
                      width="100px"
                      height="100px"
                      rounded="md"
                      border="1px solid"
                      borderColor="gray.100"
                      cursor="pointer"
                      objectFit="contain"
                      onClick={() => window.open(imageUrl)}
                    />
                  ) : (
                    <Box
                      width="100px"
                      height="100px"
                      rounded="md"
                      border="1px solid"
                      borderColor="gray.100"
                      cursor="pointer"
                      onClick={() => window.open(imageUrl)}
                    >
                      {file.name}
                    </Box>
                  )}
                </Box>
                <IconButton
                  aria-label="delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleDeleteFile(fileIdx)}
                />
              </HStack>
            )
          })}
        </VStack>
      )}
    </Box>
  )
}

export default FormUploadDropZone
