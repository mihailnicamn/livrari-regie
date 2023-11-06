import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@nextui-org/react";
import React from "react";

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function InstallPWA({ closePrompt, doNotShowAgain }: Props) {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    React.useEffect(() => {
        onOpen();
    }, []);
    return (<>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Instalează aplicația</ModalHeader>
                        <ModalBody>
                            <p>Aplicația poate fi instalată pe dispozitivul tău.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={closePrompt}>Închide</Button>
                            <Button onPress={doNotShowAgain}>Nu arăta din nou</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>)
}