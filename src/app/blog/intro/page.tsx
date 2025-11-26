import { BackIcon, LinkIcon, MailIcon } from "@/components/svg";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx/server-functions";
import BlogSpotlight from "@/provider/spotlight";

const Intro = async () => {
  const articleData = await getAllPosts();

  return (
    <>
      <BlogSpotlight articleData={articleData} />
      <article className="font-sans max-w-174 mx-auto pt-30.5">
      <div>
        <Link href="/blog" className="mb-7 inline-block p-2">
          <BackIcon />
        </Link>
      </div>
      <header className="flex justify-between">
        <div className="font-medium text-base">
          <h3 className="text-gray-900 ">rndr realm</h3>
          <p className="text-gray-600">Creative Studio</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-8 bg-gray-100 rounded-full flex items-center justify-center">
            <MailIcon />
          </div>
          <div className="size-8 bg-gray-100 rounded-full flex items-center justify-center">
            <LinkIcon />
          </div>
        </div>
      </header>

      {/* Main article */}
      <main className="pt-21">
        <h2 className="pb-8 text-gray-600 font-medium text-base">
          Oct 20, 2025
        </h2>
        <div className="pb-20">
          <p className="text-gray-1000 text-base pb-6">
            One mistake I made early in my career was thinking that design, and
            animations in particular, are an art you either “get” or you don’t.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            Everything beautiful felt like magic, and that magic felt completely
            out of reach.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            While it certainly requires developing good intuition, there are
            loads of tricks you can use to make your animations feel better
            without having to learn that “magic”.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            Here are seven simple ideas you can use to improve your animations
            today.
          </p>

          <h2 className="text-gray-1000 text-lg pt-4 pb-4 font-medium">
            1. Scale your buttons
          </h2>

          <p className="text-gray-1000 text-base pb-6">
            The interface should feel as if it’s listening to the user. You
            should aim to give the user feedback on all of their actions as soon
            as possible. Submitting a form should show a loading state, copy to
            clipboard action should show a success state.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            One easy way to make your interface feel instantly more responsive
            is to add a subtle scale down effect when a button is pressed. A
            scale of 0.97 on the :active pseudo-class should do the job:
          </p>
        </div>
        <div className="pb-20">
          <p className="text-gray-1000 text-base pb-6">
            One mistake I made early in my career was thinking that design, and
            animations in particular, are an art you either “get” or you don’t.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            Everything beautiful felt like magic, and that magic felt completely
            out of reach.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            While it certainly requires developing good intuition, there are
            loads of tricks you can use to make your animations feel better
            without having to learn that “magic”.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            Here are seven simple ideas you can use to improve your animations
            today.
          </p>

          <h2 className="text-gray-1000 text-lg pt-4 pb-4 font-medium">
            1. Scale your buttons
          </h2>

          <p className="text-gray-1000 text-base pb-6">
            The interface should feel as if it’s listening to the user. You
            should aim to give the user feedback on all of their actions as soon
            as possible. Submitting a form should show a loading state, copy to
            clipboard action should show a success state.
          </p>
          <p className="text-gray-1000 text-base pb-6">
            One easy way to make your interface feel instantly more responsive
            is to add a subtle scale down effect when a button is pressed. A
            scale of 0.97 on the :active pseudo-class should do the job:
          </p>
        </div>
      </main>

      <footer className="pt-8  pb-20 border-t-2 border-gray-050 ">
        <h3 className="text-gray-900 font-medium text-xl pb-2">
          Continue this discussion
        </h3>
        <p className="font-sans  text-base text-gray-900">
          We're always happy to speak to people about the work we do at the
          realm, reach out to us on rndrrealm@gmail.com, looking forward to our
          conversation.
        </p>
      </footer>
    </article>
    </>
  );
};

export default Intro;
