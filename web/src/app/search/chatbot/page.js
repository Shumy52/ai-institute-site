export const metadata = { title: "Search – AIRi Chatbot" };

import ChatbotClient from "./ChatbotClient";

export default function ChatbotSoon() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full">
        <section className="p-6 md:p-10">
          <ChatbotClient />
        </section>
      </div>
    </main>
  );
}
