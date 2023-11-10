import React from 'react';
import { FlatList } from 'react-native';

interface Props {
  isHorizontal?: boolean;
  style?: any;
}

interface State {
}

export default class VirtualizedView extends React.PureComponent<Props, State> {
  render(): React.ReactNode {
    return (
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => 'id'}
        renderItem={null}
        horizontal={this.props.isHorizontal}
        ListHeaderComponent={() => (
          <React.Fragment>{this.props.children}</React.Fragment>
        )}
        style={{...this.props.style}}
      />
    );
  }
}
