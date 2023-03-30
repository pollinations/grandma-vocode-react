import "@fontsource/inter";
import "./App.css";

import {
  Box,
  ChakraProvider,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Conversation from "./components/Conversation";

import { isChrome, isMobile, isSafari } from "react-device-detect";
import { WarningIcon } from "@chakra-ui/icons";
import {
  DeepgramTranscriberConfig,
  LLMAgentConfig,
  AzureSynthesizerConfig,
  VocodeConfig,
  EchoAgentConfig,
  ChatGPTAgentConfig,
  RESTfulUserImplementedAgentConfig,
  WebSocketUserImplementedAgentConfig,
} from "vocode";

const App = () => {
  const transcriberConfig: Omit<
    DeepgramTranscriberConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "transcriber_deepgram",
    chunkSize: 2048,
    endpointingConfig: {
      type: "endpointing_punctuation_based",
    },
  };
  const agentConfig: ChatGPTAgentConfig = {
    type: "agent_chat_gpt",
    initialMessage: { type: "message_base", text: "Hello!" },
    promptPreamble:
      `I’m having trouble with a scene in my screenplay where a person has a conversation with a Stoic.

      I have written all of the person's lines already, but I haven’t written any of the lines for the Stoic. So what I’d like to do is give you the person’s lines, and have you provide a response for the Stoic.
      I’ll give you the person’s lines one at a time, so only give me a single line of dialogue from the Stoic each time, and then wait for me to tell you the next line from the person, and we’ll simply repeat that process until the scene is complete.
      
      Stay in character!
      
      The person’s first line is:
      
      Hello`,
    endConversationOnGoodbye: true,
    generateResponses: true,
    cutOffResponse: {},
  };
  const synthesizerConfig: Omit<
    AzureSynthesizerConfig,
    "samplingRate" | "audioEncoding"
  > = {
    type: "synthesizer_azure",
    shouldEncodeAsWav: true,
    voiceName: "en-US-SteffanNeural",
  };
  const vocodeConfig: VocodeConfig = {
    apiKey: process.env.REACT_APP_VOCODE_API_KEY || "",
  };

  return (
    <ChakraProvider>
      {(isMobile || !isChrome) && !isSafari ? (
        <VStack padding={10} alignItems="center">
          <WarningIcon boxSize={100} />
          <Text paddingTop={4}>
            This demo works on: Chrome (desktop) and Safari (desktop, mobile)
            only!
          </Text>
        </VStack>
      ) : (
        <Conversation
          config={{
            transcriberConfig,
            agentConfig,
            synthesizerConfig,
            vocodeConfig,
          }}
        />
      )}
    </ChakraProvider>
  );
};

export default App;
