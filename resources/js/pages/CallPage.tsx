// @ts-nocheck
import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

type Props = {
    roomId: string;
    userId: string;
    userName: string;
    appId: number;
    serverSecret: string;
};

function CallPage({ roomId, userId, userName, appId, serverSecret }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(Number(appId), serverSecret, roomId, userId, userName);

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: containerRef.current,
            sharedLinks: [{ name: 'Copy Link', url: window.location.href }],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            showScreenSharingButton: true,
            turnOnCameraWhenJoining: true,
            turnOnMicrophoneWhenJoining: true,
        });

        return () => {
            try {
                zp.destroy();
            } catch (e) {
                console.log(e);
            }
        };
    }, [roomId, userId, userName, appId, serverSecret]);

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='mx-auto max-w-6xl'>
                <h1 className='mb-4 text-2xl font-semibold'>Room: {roomId}</h1>
                <div ref={containerRef} className='h-[75vh] w-full rounded-lg border bg-white'></div>
            </div>
        </div>
    );
}

export default CallPage;