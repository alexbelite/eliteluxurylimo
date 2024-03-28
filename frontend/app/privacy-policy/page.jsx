export const metadata = {
    title: 'Privacy & Policy',
}

export default function PrivacyAndPolicy() {
    return (
        <section className="container py-10 flex flex-col gap-3">
            <div className="w-full h-[100px]"></div>
            <div className="dark text-white">
                <h2 className="yellow-tc text-center">Privacy Policy</h2>
            </div>
            <div className="my-4 flex flex-col gap-3">
                <p>Elite Luxury Limousine respects your privacy and your name
                    and personal information will not be given to anyone without
                    your consent. The information you supply is used to improve
                    service and customize offers to you. Your name and address
                    will only be used by Elite Luxury Limousine or its assignees for
                    the purpose of rendering service or to collect payments for
                    services rendered. Your email address is used for sending
                    confirmations, information and service enhancements.</p>
            </div>
        </section>
    )

}