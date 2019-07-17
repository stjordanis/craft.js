import React, { useMemo, useContext } from "react";
import { Canvas, useNode } from "../nodes";
import { useInternalNode } from "../nodes/useInternalNode";
import { RootContext } from "../RootContext";

export const SimpleElement = ({render}: any) => {
  const {connectTarget} = useNode();
  return connectTarget(render);
}

export const RenderNodeToElement: React.FC<any> =React.memo(({ ...injectedProps}) => {
  const { type, props } = useInternalNode((node) => ({type: node.data.type, props: node.data.props}));
  const { options: { onRender}} = useContext(RootContext);
  return useMemo(() => {
    let Comp = type;
    let render = React.cloneElement(<Comp {...props} {...injectedProps} />);
    if (typeof Comp === 'string') render = <SimpleElement render={render} />

    return React.createElement(onRender, {render}, null);
  }, [type, props]);
});
