import React, {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Box,
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MessageIcon from "@mui/icons-material/Message";
import {useDispatch, useSelector} from "react-redux";
import {
    CURRENT_USER_ID_CONST,
    selectConversation,
    sendMessage
} from "../../store/slices/data_messages";

const ChatDialog = ({listing, onClose}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    const {owner, listingId, property} = listing;

    const messages = useSelector(selectConversation(listingId));

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        // sendMessage() - κλάση Message του UML
        dispatch(sendMessage({
            listingId,
            receiverId: owner.userId,
            content: trimmed,
            title: property.title
        }));
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Dialog
            open
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    height: 520,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }
            }}
        >
            {/* Header */}
            <DialogTitle sx={{p: 0}}>
                <Box sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    px: 2, py: 1.5,
                    bgcolor: theme.palette.primary.main,
                    color: "#fff"
                }}>
                    <Avatar sx={{width: 36, height: 36, bgcolor: "rgba(255,255,255,0.25)", fontSize: 14}}>
                        {owner.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{flex: 1, minWidth: 0}}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap>
                            {owner.username}
                        </Typography>
                        <Typography variant="caption" sx={{opacity: 0.8}}>
                            {owner.role} • {property.title}
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose} sx={{color: "#fff"}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </DialogTitle>

            <Divider/>

            {/* Messages area */}
            <Box sx={{
                flex: 1,
                overflowY: "auto",
                px: 2, py: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                bgcolor: theme.palette.background.default
            }}>
                {messages.length === 0 ? (
                    <Box sx={{
                        flex: 1, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", opacity: 0.4
                    }}>
                        <MessageIcon sx={{fontSize: 48, mb: 1}}/>
                        <Typography variant="body2" textAlign="center">
                            No messages yet.<br/>Start the conversation!
                        </Typography>
                    </Box>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.senderId === CURRENT_USER_ID_CONST;
                        return (
                            <Box
                                key={msg.messageId}
                                sx={{
                                    display: "flex",
                                    justifyContent: isMe ? "flex-end" : "flex-start"
                                }}
                            >
                                <Box sx={{
                                    maxWidth: "75%",
                                    px: 1.5, py: 1,
                                    borderRadius: isMe
                                        ? "16px 16px 4px 16px"
                                        : "16px 16px 16px 4px",
                                    bgcolor: isMe
                                        ? theme.palette.primary.main
                                        : theme.palette.background.paper,
                                    color: isMe ? "#fff" : theme.palette.text.primary,
                                    boxShadow: 1
                                }}>
                                    <Typography variant="body2" sx={{wordBreak: "break-word"}}>
                                        {msg.content}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            mt: 0.3,
                                            opacity: 0.65,
                                            textAlign: "right",
                                            fontSize: 10
                                        }}
                                    >
                                        {new Date(msg.issueDate).toLocaleTimeString("el-GR", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })
                )}
                <div ref={bottomRef}/>
            </Box>

            <Divider/>

            {/* Input */}
            <Box sx={{px: 2, py: 1.5, bgcolor: theme.palette.background.paper}}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a message..."
                    multiline
                    maxRows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    color="primary"
                                    size="small"
                                >
                                    <SendIcon fontSize="small"/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {borderRadius: 3}
                    }}
                />
                <Typography variant="caption" color="text.disabled" sx={{mt: 0.5, display: "block"}}>
                    Press Enter to send
                </Typography>
            </Box>
        </Dialog>
    );
};

export default ChatDialog;
