import { createContext, useContext, useState } from "react";
// Importing contexts
import { SnackBarContext } from "./SnackBar.context";
// Importing actions

export const ConfirmationDialogContext = createContext();
export const ConfirmationDialogProvider = ({ children }) => {
    const [dialog, setDialog] = useState(false);
    const [dialogValue, setDialogValue] = useState({
        title: "",
        message: "",
        cancelBtnText: "",
        submitBtnText: "",
        dialogId: null,
        rest: null,
    });
    const [linearProgressBar, setLinearProgressBar] = useState(false);
    const openDialog = async (values) => {
        await setDialogValue(values);
        await setDialog(true);
        document.querySelector("#focusPostBtn").focus();
    };
    const closeDialog = () => {
        setDialog(false);
        setLinearProgressBar(false)
    };

    const { setSnackbarValue, setSnackbarState } = useContext(SnackBarContext);
    const handleError = (error) => {
        closeDialog();
        setSnackbarValue({ message: error.message, status: "error" });
        setSnackbarState(true);
    }
    const handleDialog = async () => {
        switch (dialogValue.dialogId) {
            case 1:
                console.log("Create Post");
                try {
                    // const { navigate, postData, selectedFile, type, tabIndex, openDialogContent } = dialogValue.rest;
                    // setLinearProgressBar(true);
                    // let updatedData;
                    // if (tabIndex === "1") {
                    //     updatedData = postData;
                    // } else if (tabIndex === "2") {
                    //     const { body, ...rest } = postData;
                    //     updatedData = rest;
                    // }
                    // const { status, result } = await dispatch(createPost(updatedData));
                    // closeDialog();
                    // if (status === 200) {
                    //     const postId = result._id;
                    //     const postData = result;
                    //     if (selectedFile.length > 0) {
                    //         openDialogContent("Uploading Media");
                    //         setLinearProgressBar(true);
                    //         const { status, result } = await dispatch(uploadPostMedia({ selectedFile, postId, type }));
                    //         if (status === 200) {
                    //             navigate(`/post/${postId}`, { state: { postData: postData, status: "success", message: "Post added!", time: new Date().getTime() } });
                    //         } else {
                    //             setSnackbarValue({ message: result.message, status: "error" });
                    //             setSnackbarState(true);
                    //         }
                    //         closeDialog();
                    //     } else {
                    //         navigate(`/post/${postId}`, { state: { postData: postData, status: "success", message: "Post added!", time: new Date().getTime() } });
                    //     }
                    // } else {
                    //     setSnackbarValue({ message: result.message, status: "error" });
                    //     setSnackbarState(true);
                    // }
                } catch (error) { handleError(error) }
                break;
            default:
                return null;
        }
    }

    return (
        <ConfirmationDialogContext.Provider value={{ dialog, dialogValue, openDialog, closeDialog, handleDialog, linearProgressBar, setLinearProgressBar }}>
            {children}
        </ConfirmationDialogContext.Provider>
    )
}